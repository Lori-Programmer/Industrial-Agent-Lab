import { EdgeVisionLab } from "@/components/edge-vision-lab/EdgeVisionLab";

export const metadata = {
  title: "工业视觉识物实验室",
  description:
    "Edge Vision Lab：基于网页摄像头的固定场景物体识别 Demo，用于展示边缘 AI、工业视觉和工程感知能力。"
};

export default function EdgeVisionLabPage() {
  return <EdgeVisionLab />;
}
