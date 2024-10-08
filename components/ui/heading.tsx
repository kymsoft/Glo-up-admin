import { FC } from "react";

interface HeadingProps{
    title: string;
    description: string;
}

const Heading: FC<HeadingProps> = ({
    title,
    description
}) => {
  return (
    <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading