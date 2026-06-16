type MajorCitiesSkeletonProps = {
    heading: string;
    subheading: string;
};

export default function MajorCitiesSkeleton({ heading, subheading }: MajorCitiesSkeletonProps) {
    return (
        <section className="bg-white rounded-lg w-full p-4">
            <h2 className="text-primary font-bold text-lg mb-1">{heading}</h2>
            <p className="text-primary/70 text-sm mb-4">{subheading}</p>
            <div className="flex gap-4">
                {[1, 2, 3, 4].map((placeholder) => (
                    <div
                        key={placeholder}
                        className="shrink-0 w-72 h-80 animate-pulse rounded-xl bg-secondary"
                    />
                ))}
            </div>
        </section>
    );
}
