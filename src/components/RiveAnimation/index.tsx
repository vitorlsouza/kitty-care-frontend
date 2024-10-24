import { useRive } from "rive-react";

const RiveAnimation = ({ src }: { src: string }) => {
  const { RiveComponent } = useRive({
    src: src,
    autoplay: true,
  });
  return <RiveComponent />;
};

export default RiveAnimation;
