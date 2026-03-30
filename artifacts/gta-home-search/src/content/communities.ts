export interface Community {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  whyLiveHere: string;
  housingTypes: string;
  amenities: string;
  imageUrl: string;
}

export const communities: Community[] = [
  {
    name: "Pickering",
    slug: "pickering",
    tagline: "Lakeside Living & Suburban Charm",
    description: "Pickering offers a growing lakefront city experience with a mix of suburban and new communities. With excellent GO train access and beautiful waterfront trails, it's an ideal choice for families and first-time buyers looking for space without sacrificing connectivity to Toronto.",
    whyLiveHere: "Residents love the balance of nature and urban convenience. The waterfront provides endless recreational opportunities, while the emerging downtown core offers shopping and dining. Excellent transit links make commuting a breeze.",
    housingTypes: "The market features a diverse mix of traditional detached homes, newly built townhomes, and emerging high-rise condos near the GO station.",
    amenities: "Key highlights include Frenchman's Bay, Pickering Town Centre, numerous parks and trails, and a strong network of public and Catholic schools.",
    imageUrl: "/images/pickering.jpg",
  },
  {
    name: "Ajax",
    slug: "ajax",
    tagline: "Family-Friendly Community Near the Water",
    description: "Ajax is renowned for its family-friendly atmosphere, great schools, and newer master-planned communities. With convenient Highway 401 access, it offers an affordable alternative to Toronto while maintaining a high quality of life.",
    whyLiveHere: "A strong sense of community, extensive waterfront parklands, and modern recreational facilities make Ajax perfect for raising a family. The diverse population brings vibrant cultural events and dining options.",
    housingTypes: "Predominantly newer detached family homes and townhouses, with some low-rise condominium developments.",
    amenities: "Enjoy the Ajax Waterfront Park, Greenwood Conservation Area, excellent community centres, and a wide array of local shopping plazas.",
    imageUrl: "/images/ajax.jpg",
  },
  {
    name: "Whitby",
    slug: "whitby",
    tagline: "Historic Roots & Rapid Growth",
    description: "Whitby combines a rapidly growing population with a charming downtown revitalization. Known for its excellent schools and family-oriented neighborhoods, Whitby provides a perfect blend of historic character and modern amenities.",
    whyLiveHere: "The revitalized downtown area offers unique boutiques and restaurants, while the expansive sports facilities and green spaces cater to an active lifestyle. It's a community that values both its heritage and its future.",
    housingTypes: "A beautiful mix of historic homes near the downtown core, large detached properties in suburban subdivisions, and modern townhomes.",
    amenities: "Features include the Whitby Marina, Iroquois Park Sports Centre, top-tier schools, and the historic downtown shopping district.",
    imageUrl: "/images/whitby.jpg",
  },
  {
    name: "Markham",
    slug: "markham",
    tagline: "Diverse Tech Hub & Heritage Culture",
    description: "Markham is a dynamic and diverse city, serving as a major tech hub in the GTA. It boasts excellent schools, high demand, and a vibrant cultural scene, anchored by the historic beauty of Main Street Unionville.",
    whyLiveHere: "Markham offers a high standard of living with top-ranked educational institutions, a booming economy, and rich cultural diversity. It's a place where innovation meets heritage.",
    housingTypes: "From luxury estates to modern high-rise condos and family-oriented townhomes, Markham covers all price points and lifestyle needs.",
    amenities: "Highlights include historic Unionville, Markville Mall, extensive tech campuses, and numerous parks and cultural centres.",
    imageUrl: "/images/markham.jpg",
  },
  {
    name: "Vaughan",
    slug: "vaughan",
    tagline: "Luxury Living & Metropolitan Growth",
    description: "Vaughan is characterized by its luxury real estate market and the rapidly developing Vaughan Metropolitan Centre (VMC). With TTC subway access and established family areas like Maple and Woodbridge, it's a city on the rise.",
    whyLiveHere: "The convenience of subway access to downtown Toronto combined with spacious suburban living makes Vaughan highly desirable. It offers a premium lifestyle with world-class entertainment and shopping.",
    housingTypes: "Features grand luxury homes, established detached family neighborhoods, and sleek new high-rise condominiums in the VMC.",
    amenities: "Home to Canada's Wonderland, Vaughan Mills shopping centre, the VMC transit hub, and extensive parklands.",
    imageUrl: "/images/vaughan.jpg",
  },
  {
    name: "Richmond Hill",
    slug: "richmond-hill",
    tagline: "Prestigious Neighborhoods & Top Schools",
    description: "Richmond Hill is synonymous with prestige, diverse communities, and some of the highest-ranked schools in the province. Located just north of Toronto, it offers a refined mix of luxury and family-friendly living.",
    whyLiveHere: "Families are drawn to Richmond Hill for its exceptional educational opportunities, safe neighborhoods, and upscale amenities. It provides a quiet, luxurious retreat close to the urban core.",
    housingTypes: "Dominant properties include large estate homes, premium detached houses, and luxury townhomes.",
    amenities: "Features the David Dunlap Observatory, Richmond Hill Centre for the Performing Arts, beautiful parks, and premium shopping.",
    imageUrl: "/images/richmond-hill.jpg",
  },
  {
    name: "North York",
    slug: "north-york",
    tagline: "Urban Convenience & Suburban Comfort",
    description: "North York provides the perfect urban/suburban mix with excellent TTC access, particularly along the vibrant Yonge Street corridor. It's a highly diverse area offering everything from bustling high-rises to quiet family enclaves.",
    whyLiveHere: "The unparalleled access to transit, world-class dining, and major employment centres make North York incredibly convenient. It offers city living with the space of the suburbs.",
    housingTypes: "A stark contrast between dense high-rise condominiums along major corridors and expansive detached homes in quiet, leafy neighborhoods.",
    amenities: "Enjoy Mel Lastman Square, Yorkdale Shopping Centre, the Toronto Centre for the Arts, and extensive subway connectivity.",
    imageUrl: "/images/north-york.jpg",
  },
  {
    name: "Scarborough",
    slug: "scarborough",
    tagline: "Value, Diversity & Waterfront Beauty",
    description: "Scarborough is a remarkable value play in the GTA market, known for its incredible diversity, stunning waterfront areas like the Bluffs, and improving transit infrastructure including the Eglinton LRT.",
    whyLiveHere: "Homebuyers appreciate the larger lot sizes, affordability relative to the rest of Toronto, and the unmatched natural beauty of the Scarborough Bluffs. It's a culturally rich community with vibrant culinary scenes.",
    housingTypes: "A wide variety including mid-century detached bungalows on large lots, townhomes, and affordable condominium options.",
    amenities: "Famous for the Scarborough Bluffs, Rouge National Urban Park, diverse dining, and the Scarborough Town Centre.",
    imageUrl: "/images/scarborough.jpg",
  }
];
