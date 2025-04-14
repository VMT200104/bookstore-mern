import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-md p-4">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {review.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="font-medium">{review.name}</p>
        </div>
        <div className="flex gap-1">
          {renderStars()}
        </div>
        <p className="text-sm text-gray-600">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
