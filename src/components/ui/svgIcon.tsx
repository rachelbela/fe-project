import React, { useEffect, useState } from "react";

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: string;
  size?: number;
  color?: string;
}

const SVGIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
}) => {
  const [SvgIcon, setSvgIcon] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    const importSvgIcon = async () => {
      try {
        const icon = await import(`../../assets/icons/${name}.svg?react`);
        setSvgIcon(() => icon.default);
      } catch (error) {
        console.error(`Error loading SVG icon: ${name}`, error);
      }
    };

    importSvgIcon();
  }, [name]);

  if (!SvgIcon) {
    return null; // 或者返回一个默认的图标或占位符
  }

  return <SvgIcon width={size} height={size} fill={color} />;
};

export default SVGIcon;
