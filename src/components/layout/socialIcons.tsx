import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import type { ReactElement, FC } from 'react';

export default function SocialIcons(): ReactElement<FC> {
    return (
        <ul className="flex flex-row justify-center md:justify-end">
            <li className="px-1 md:px-3">
                <a target="_blank" href="https://www.linkedin.com/in/stefan-netterfield-981b09269">
                    <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7 transition-colors ease-linear hover:text-dark-red" />
                </a>
            </li>
            <li className="px-1 md:px-3">
                <a target="_blank" href="https://github.com/VEDA95/personal-portfolio-site">
                    <FontAwesomeIcon icon={faGithub} className="w-7 h-7 transition-colors ease-linear hover:text-dark-red" />
                </a>
            </li>
        </ul>
    );
}