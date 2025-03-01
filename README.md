# PaintX

PaintX is a lightweight web-based drawing application built using **React, Vite, and Tailwind CSS**. It offers a clean, responsive UI that adapts to different screen sizes, providing users with tools to create digital drawings, undo/redo actions, erase, and export their artwork in multiple formats seamlessly

## Demo

![PaintX Demo](https://github.com/user-attachments/assets/5b14778e-e38d-4c4a-8a20-4214d8cb2d9c)

## Features

- **Drawing Tools**: Supports brush and eraser.
- **Customization**: Adjust brush color, size, and opacity.
- **Undo/Redo**: Easily revert or redo actions.
- **Export Options**: Save drawings as PNG, JPG, SVG, and PDF.
- **Touch Support**: Works on touch devices.
- **Error Handling**: Uses an ErrorBoundary component.
- **Responsive UI**: Designed for different screen sizes.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: useState & useRef
- **Rendering**: HTML5 Canvas API

## Live Demo

Try PaintX online: [**PaintX Live Demo**](https://paint-x.netlify.app/)

## Installation

- #### Fork & Clone the Repository

#### Step 1: Fork the Repository

Click the **`Fork`** button at the top right of the repository page. This creates a copy under your GitHub account.

#### Step 2: Clone Your Fork

- #### Copy and run this command in your terminal:

```sh
git clone https://github.com/YOUR-USERNAME/paint_x.git
```
- #### Navigate to the Project Directory:

```sh
cd paint_x
```

- #### Install Dependencies:

```sh
npm install
```

- #### Run the following command to install Tailwind CSS v4:

```sh
npm install tailwindcss @tailwindcss/vite
```

- #### Run the following command to start the local development server:

```sh
npm run dev
```

This will launch your app on http://localhost:5173/

## Project Structure

```
paint_x
├── node_modules/          # Project dependencies
├── public/                # Static asset
├── src/
│   ├── components/        # UI components
│   │   ├── Menu.jsx       # Drawing toolbar
│   │   ├── Footer.jsx     # Footer section
│   ├── App.css            # Global styles
│   ├── App.jsx            # Main application logic
│   ├── ErrorBoundary.jsx  # Error handling
│   ├── App.css            # Global styles
│   ├── main.jsx           # Main application logic
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package-lock.json      # Lock file for dependencies
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
```

## Error Handling

An ErrorBoundary component is implemented to catch any unexpected errors and display a fallback message.

## Contributing

Feel free to fork the repository, add new features, and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
