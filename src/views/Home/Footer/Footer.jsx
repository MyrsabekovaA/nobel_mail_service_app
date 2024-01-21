import "./Footer.css";

function Footer() {
  return (
    <footer
      className={`flex  gap-2 px-3 py-3 w-full justify-center drop-shadow-1 dark:bg-compdark
         dark:drop-shadow-none dark:text-gray text-sm md:text-base
        `}
    >
      <span>2023 Automation Team ❤️</span>
      <a href="mailto:volodymyr.ch@nobelcoaching.com">
        volodymyr.ch@nobelcoaching.com
      </a>
    </footer>
  );
}

export default Footer;
