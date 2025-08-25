import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from 'next/image';

interface ImagePreviewProps {
  imageUrl: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <AspectRatio ratio={16 / 9}>
          {imageUrl ? (
            <Image src={imageUrl} alt="Uploaded palm" className="rounded-md object-contain w-full h-full" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-muted">
              <p className="text-muted-foreground">Upload an image to get started</p>
            </div>
          )}
        </AspectRatio>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;