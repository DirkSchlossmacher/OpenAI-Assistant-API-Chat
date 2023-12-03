import { VercelIcon, GithubIcon } from "../icons";

const LinkBar = () => (
  <div>
    <div>
    <a
        href="/adex"
        target="_blank"
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
      >
        <img src="..\AdEx_Beratung_LOGO_color_RGB.svg" alt="AdEx Logo" />
      </a>  

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
  </div>

);

export default LinkBar;
