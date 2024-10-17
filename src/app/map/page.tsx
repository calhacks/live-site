import GoogleMapsMapImage from "@/assets/images/google-maps-map.png";
import VenueMapImage from "@/assets/images/venue-map.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default function Map(): React.ReactNode {
	return (
		<main className="grid h-screen w-full place-items-center pt-header">
			<Carousel className="w-3/5">
				<CarouselContent>
					<CarouselItem className="grid place-items-center">
						<Image src={GoogleMapsMapImage} alt="Google maps" />
					</CarouselItem>

					<CarouselItem className="grid place-items-center">
						<Image src={VenueMapImage} alt="Venue map" />
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className="h-8 w-8 sm:h-12 sm:w-12" />
				<CarouselNext className="h-8 w-8 sm:h-12 sm:w-12" />
			</Carousel>
		</main>
	);
}
