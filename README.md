# Pokémon Card Collection

A web application for exploring Pokémon cards, their details, and distributions. Built with modern web technologies, this project provides an interactive and visually rich experience.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: v23+ (for `yarn` to work properly)
- **Yarn**: Latest stable version
- **Docker**: If you prefer containerized deployment
- **Git**: To clone the repository

---

## Technologies Used

- **React**: UI framework
- **Ant Design**: Component library for UI
- **ECharts**: Visualization library for data visualization
- **TypeScript**: Static typing
- **Docker**: Containerized deployment
- **Vite**: Development build tool for faster builds
- **CSS Modules**: Scoped CSS for styling

---

## How to Start

### Option 1 (Recommended): Local Development
1. Install dependencies:
   ```bash
   yarn
    ```
2. Start the development server:
   ```bash
   yarn dev
    ``` 

3. Open your browser and navigate to:
   ```bash
   http://localhost:5173/pokemon-card-collection/
    ``` 

### Option 2: Docker Standalone
1. Build the Docker image:
   ```bash
   docker build -t pokemon-card-collection .
    ```
2. Run the container:
   ```bash
   docker run -p 80:80 pokemon-card-collection
    ``` 

3. Open your browser and navigate to:
   ```bash
   http://localhost/pokemon-card-collection/
    ``` 

### Option 2: Docker Compose
1. Build the Docker image using Docker Compose:
   ```bash
   docker-compose build
    ```
2. Run the Docker image using Docker Compose:
   ```bash
   docker run -p 80:80 pokemon-card-collection
    ``` 

3. Open your browser and navigate to:
   ```bash
   http://localhost/pokemon-card-collection/
    ``` 

## Future Work

### UI Enhancements
- **Better UI**: Improve the overall look and feel.
- **Responsive Design**: Currently optimized for wide screens (1600px width). Needs adjustments for smaller screens.
- **Custom or Ant Design**: Finalize between fully custom styles or sticking to Ant Design. (Would have used Tailwind if more time was available.)
- **Fix Chart Issues**: Address spacing issues, such as in `RaritySection.tsx`.

### Functionality Improvements
- **Filter Fixes**: Resolve filtering issues, e.g., cannot filter to "Energy" in the card list.
- **Boxplot Navigation Error**: Fix the navigation bug in the boxplot section.

### Technical Updates
- **Linting**: Add or fix the linter configuration.
- **Better Typing**: Improve TypeScript typing across the project.
- **Fix Path Imports**: Normalize imports (e.g., `@` vs `.`).
- **Inline CSS**: Minimize and fix instances of inline CSS.
- **Unit Test**: Add more unit tests

### Deployment
- **GitHub Actions**: Automate deployment to GitHub Pages on commits to `main`.
- **SEO Updates**: Update meta information for better search engine optimization.
- **nginx**: Fix nginx redirect issue.

---

## References
- **ECharts Examples**: [ECharts Examples](https://echarts.apache.org/examples/en/)
- **ECharts Options**: [ECharts Options Documentation](https://echarts.apache.org/en/option.html#title)
- **Ant Desing**: [Ant Desing](https://ant.design/docs/react/getting-started)
- **Vite**: [Vite](https://vite.dev/guide/)


---

## License
This project is licensed under the MIT License.