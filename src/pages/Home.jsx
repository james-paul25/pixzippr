import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, ImagePlus, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <main className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                Welcome to PixZippr
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Securely watermark your images in bulk. Fast, simple, and free.
            </p>

            <Link
                to="/upload"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition"
            >
                Get Started
            </Link>

            <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <div className="flex flex-col items-center text-center">
                    <Upload size={40} className="text-indigo-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Bulk Upload</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Upload multiple images at once and process them with a single click.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <ImagePlus size={40} className="text-indigo-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Custom Watermarks</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Add text or image-based watermarks with full position and style control.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <ShieldCheck size={40} className="text-indigo-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your images are processed securely. Nothing is stored on the server.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Home;
