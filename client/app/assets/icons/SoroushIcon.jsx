import soroush from "../../assets/images/soroush.png"
import Link from 'next/link'

const SoroushIcon = ({ link = "https://Sapp.ir/Abyekihaa" }) => (
    <Link href={link}>
        <img src={soroush.src} className='icon-top' alt='soroush' />
    </Link>
)

export default SoroushIcon;
