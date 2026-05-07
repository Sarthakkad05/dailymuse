"use client";

import SupportUsButton from "support-us-button";
import "support-us-button/style.css";
import type { supportUsButtonProps } from "support-us-button";
import logo from "../logo1.png"

const props: supportUsButtonProps = {
    Theme: "AOSSIE",
    pattern: "AOSSIE",
    buttonVariant: "AOSSIE",

    hero: {
        title: "Support Open Source Innovation",
        description: "Help us empower developers and educators worldwide through open-source projects.",
        sponsorLabel: "Our Sponsors",
        Image: { src: logo.src, alt: "background" }
    },

    organizationInformation: {
        name: "AOSSIE",
        description: "An Australian not-for-profit umbrella organization for open-source projects, dedicated to innovation-focused and research-intensive education.",
        logo: { src: logo.src, alt: "AOSSIE Logo" },
        projectInformation: {
            name: "AOSSIE Open Source Projects",
            description: "Projects spanning open money, decentralized finance, education, sustainability, communication, and governance.",
        },
    },

    // sponsors: [
    //     { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", link: "https://google.com", sponsorshipTier: "Platinum" },
    // ],
    ctaSection: {
        title: "Sponsor AOSSIE",
        description: "Your support helps us maintain and grow open-source projects that benefit developers and communities around the world. Join us in making open-source education and innovation accessible to all.",
        sponsorLink: [
            {
                name: "GitHub Sponsors",
                className: "sponsor-link",
                url: "https://github.com/sponsors/AOSSIE-Org",
                icon: null,
                newTab: true,
            },
            {
                name: "Contact Us",
                className: "sponsor-link",
                url: "mailto:aossie.oss@gmail.com",
                icon: null,
                newTab: true,
            },
        ],
    },
};


export default function Support() {
  return(
    <SupportUsButton {...props} />
  )
}