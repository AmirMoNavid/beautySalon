const { createServer } = require("http");
const { parse } = require("url");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const IMG_DIR = path.resolve(process.cwd(), "..", "public", "images");
const IMG_PREFIX = "/api/uploads/images/";

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

function serveImage(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }

  let name;
  try {
    name = decodeURIComponent(pathname.slice(IMG_PREFIX.length));
  } catch {
    res.writeHead(400);
    return res.end("Bad request");
  }

  // جلوگیری از path traversal
  if (!name || path.basename(name) !== name) {
    res.writeHead(400);
    return res.end("Invalid filename");
  }

  const type = contentTypes[path.extname(name).toLowerCase()];
  if (!type) {
    res.writeHead(415);
    return res.end("Unsupported file type");
  }

  const filePath = path.join(IMG_DIR, name);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      return res.end("File not found");
    }

    // پشتیبانی از کش شرطی (۳۰۴)
    const etag = `"${stat.size}-${Math.floor(stat.mtimeMs)}"`;
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, { ETag: etag });
      return res.end();
    }

    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": stat.size,
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: etag,
      "X-Content-Type-Options": "nosniff",
    });

    if (req.method === "HEAD") return res.end();

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => res.destroy());
    stream.pipe(res);
  });
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // تصاویر: بدون عبور از Next
      if (pathname.startsWith(IMG_PREFIX)) {
        return serveImage(req, res, pathname);
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
