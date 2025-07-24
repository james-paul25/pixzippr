import React from 'react';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">About PixZippr</h1>
            <p className="text-lg leading-relaxed">
                <strong>PixZippr</strong> is a powerful and simple web app for batch watermarking images.
                Designed for creators, photographers, and digital artists, it helps you protect your content in just a few clicks.
                Built using React, Tailwind CSS, and Spring Boot.
            </p>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-2">Meet the Developer</h2>
                <p className="text-base leading-relaxed">
                    Hi! I'm <strong>James Paul</strong>, a Computer Science student passionate about building efficient and user-friendly web applications.
                    PixZippr is a project I built to learn and showcase full-stack development using modern tools like React and Spring Boot.
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Contact: <a href="mailto:dacaldacaljamespaul@gmail.com" className="text-indigo-600 hover:underline">dacaldacaljamespaul@gmail.com</a>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    GitHub: <a href="https://github.com/james-paul25" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">github.com/james-paul25</a>
                </p>
            </div>

            <div className="mt-10">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Version 1.0 — July 2025
                </p>
            </div>
        </div>
    );
};

export default About;
