import GoogleMapsMapImage from "@/assets/images/google-maps-map.png";
import VenueMapImage from "@/assets/images/venue-map.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Map(): React.ReactNode {
	return (
		<main className="grid h-screen w-full place-items-center">
			<Tabs className="h-1/2 w-3/4 sm:h-1/2 sm:w-1/2" defaultValue="inside">
				<TabsList className="grid w-full grid-cols-2 gap-x-4 bg-transparent font-ppmondwest">
					<TabsTrigger
						value="inside"
						className="text-lg hover:border-accent-foreground hover:text-accent-foreground data-[state=active]:border-2 data-[state=active]:border-accent-foreground data-[state=active]:text-accent-foreground sm:w-1/2 sm:justify-self-end"
					>
						Inside
					</TabsTrigger>
					<TabsTrigger
						value="outside"
						className="text-lg hover:border-accent-foreground hover:text-accent-foreground data-[state=active]:border-2 data-[state=active]:border-accent-foreground data-[state=active]:text-accent-foreground sm:w-1/2 sm:justify-self-start"
					>
						Outside
					</TabsTrigger>
				</TabsList>
				<TabsContent value="inside" className="grid place-items-center p-4">
					<Image src={VenueMapImage} alt="Google maps" />
				</TabsContent>

				<TabsContent value="outside" className="grid place-items-center p-4">
					<Image src={GoogleMapsMapImage} alt="Venue map" />
				</TabsContent>
			</Tabs>
		</main>
	);
}
