import saved from "../assets/images/saved.png";

export interface savedItem {
  imgUrl: string;
  desc: string;
  price: number;
  isAvailable: boolean;
}

export const savedItems: savedItem[] = [
  {
    imgUrl: saved,
    desc: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black",
    price: 999,
    isAvailable: true,
  },
  {
    imgUrl: saved,
    desc: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
    price: 2300,
    isAvailable: true,
  },
  {
    imgUrl: saved,
    desc: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM",
    price: 70,
    isAvailable: true,
  },
  {
    imgUrl: saved,
    desc: "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear",
    price: 220,
    isAvailable: false,
  },
  {
    imgUrl: saved,
    desc: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio",
    price: 1500,
    isAvailable: true,
  },
  {
    imgUrl: saved,
    desc: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio",
    price: 1500,
    isAvailable: true,
  },
];
