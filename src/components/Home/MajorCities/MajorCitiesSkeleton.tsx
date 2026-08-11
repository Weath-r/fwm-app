type MajorCitiesSkeletonProps = {
    heading: string;
    subheading: string;
    cardsNumber: number;
};

export default function MajorCitiesSkeleton({
    heading,
    subheading,
    cardsNumber,
}: MajorCitiesSkeletonProps) {
    return (
        <section className="bg-white rounded-lg w-full p-4">
            <h2 className="text-primary font-bold text-lg mb-1">{heading}</h2>
            <p className="text-primary/70 text-sm mb-4">{subheading}</p>
            <div className="flex gap-4">
                {Array.from({ length: cardsNumber }).map((_, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-72 h-80 animate-pulse rounded-xl bg-secondary"
                    />
                ))}
            </div>
        </section>
    );
}
