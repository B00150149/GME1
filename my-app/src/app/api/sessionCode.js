import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers'


export async function getCustomSession(){
    console.log("loading session stuff");// Await cookies() here

    const cookieStore = await cookies();
    let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"
    const session = await getIronSession(cookieStore, { password: pw, cookieName: "app" });

    return session
}

