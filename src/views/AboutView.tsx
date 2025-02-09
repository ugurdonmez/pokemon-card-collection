import React from 'react';
import './AboutView.css';

const AboutView: React.FC = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-description">
                Welcome to the Pokémon Card Collection App! This application is designed to help users explore, analyze, and share information about Pokémon cards.
            </p>

            <h2>Features</h2>
            <ul className="about-features">
                <li>Interactive charts to visualize Pokémon card distributions.</li>
                <li>Advanced filtering and sorting options for the card collection.</li>
                <li>Detailed view for each card, showcasing attributes like attacks, weaknesses, and evolution details.</li>
                <li>Pagination for easy navigation through large card collections.</li>
                <li>Shareable links for charts and filters, perfect for collaboration.</li>
            </ul>

            <h2>Technologies Used</h2>
            <ul className="about-technologies">
                <li><strong>React</strong>: Frontend library for building user interfaces.</li>
                <li><strong>TypeScript</strong>: Ensures type safety and better development experience.</li>
                <li><strong>Ant Design</strong>: UI component library for building elegant interfaces.</li>
                <li><strong>ECharts</strong>: For interactive data visualizations.</li>
                <li><strong>Docker</strong>: Containerization for easy deployment.</li>
                <li><strong>Vite</strong>: Fast build tool for local development.</li>
            </ul>

            <h2>Future Enhancements</h2>
            <p>
                We have plans to improve the application further:
            </p>
            <ul className="about-future-work">
                <li>Enhance the UI for a better user experience.</li>
                <li>Improve responsiveness for small screens.</li>
                <li>Fix and optimize GitHub Actions for seamless deployment.</li>
                <li>Refine SEO and add better metadata for search engine visibility.</li>
            </ul>

            <h2>Developer Notes</h2>
            <p className="about-notes">
                This project is open-source and contributions are welcome. If you encounter any issues or have suggestions, feel free to raise them in the repository.
            </p>
        </div>
    );
};

export default AboutView;
