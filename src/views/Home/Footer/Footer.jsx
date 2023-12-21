import './Footer.css'

const Footer = () => {

    return (
        <footer className={`flex px-3 py-3 w-full justify-between drop-shadow-1 dark:bg-compdark
         dark:drop-shadow-none dark:text-gray text-sm md:text-base
        `}>
            <span>2023 Automation Team ❤️</span>
            <span>email@example.com</span>
        </footer>
    );
};

export default Footer;