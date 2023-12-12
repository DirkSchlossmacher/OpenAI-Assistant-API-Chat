import { VercelIcon, GithubIcon, AdExLogo } from "../icons";

const LinkBar = () => {
  // Extract the pathname from the current URL
  if (typeof window !== 'undefined'){
    const pathName = window.location.pathname;
  }else{
    const pathName = "/";
  }
  

  // Remove the leading slash if it exists to get the "SalesGuru" part
  const extractedPath = pathName.startsWith('/') ? pathName.substring(1) : pathName;

    return(
    <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
      <a
        href="https://www.adexpartners.com"
        target="_blank"
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
      >
        <AdExLogo />
        <div>{extractedPath}</div>
      </a>
      <a
        href="/github"
        target="_blank"
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
      >
        <GithubIcon />
      </a>
    </div>
  );
};

export default LinkBar;
