// src/pages/About.jsx
import React from 'react';
import { Mail, Github } from 'lucide-react';
import Profile from "../assets/profile.jpg"

const About = () => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">About PixZippr</h1>

            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-8">
                <strong>PixZippr</strong> is a simple and fast web app for batch watermarking images. Whether you're a content creator,
                photographer, or designer, this tool helps you protect your work quickly and efficiently. Built using React, Tailwind CSS, and Spring Boot.
            </p>

            <hr className="my-10 border-gray-300 dark:border-gray-600" />

            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={Profile}
                    alt="James Paul"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">👋 Meet the Developer</h2>
                    <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
                        Hi I'm <strong>James Paul</strong>, a Computer Science student passionate about clean code and useful software.
                        PixZippr is a personal project to learn and showcase full-stack web development using modern tools.
                    </p>

                    <div className="mt-4 flex gap-4 text-indigo-600 dark:text-indigo-400">
                        <a
                            href="mailto:jamespaul.official@gmail.com"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <Mail size={18} />
                            Email
                        </a>
                        <a
                            href="https://github.com/james-paul25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                Version 1.0 – July 2025
            </div>
        </div>
    );
};

export default About;
