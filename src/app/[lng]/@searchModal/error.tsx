"use client";

export default function ModalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h3 className="text-primary">Modal failed to load</h3>
            <p className="text-danger">{error.message}</p>
            <button onClick={reset} className="font-bold text-primary">Try Again</button>
        </div>
    );
}