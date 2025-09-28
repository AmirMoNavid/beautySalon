import Link from 'next/link'
import Instagram from "../../assets/images/insta.png"

const InstagramIcon = ({ link = "https://www.instagram.com/_u/Abyekiha_eg" }) => (
    <Link href={link}>
        <img src={Instagram.src} className='icon-top' alt='robika' />
    </Link>
)

export default InstagramIcon;
