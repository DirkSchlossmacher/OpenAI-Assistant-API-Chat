import { VercelIcon, GithubIcon } from "../icons";

const LinkBar = () => (
  
  <div>
    <AdExIcon />
    <div>
      AdEx <b>SalesGuru</b> - via secure OpenAI Assistant API
    </div>
    <a
      href="/github"
      target="_blank"
      className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
    >
      <GithubIcon />
    </a>
  </div>
  <div>
    Placeholder for Default
  </div>
);

export default LinkBar;
