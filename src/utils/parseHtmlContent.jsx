import DOMPurify from "dompurify";

// Helper function to parse HTML string and convert to JSX with Tailwind classes
export const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};