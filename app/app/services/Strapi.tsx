import { SERVER_API_URL, SERVER_URL } from "../config";
import { IContentChild, IContentItem, IManifiest, IPage, ISocial } from "../interfaces/interfaces";

export async function APIGetManifiest() : Promise<IManifiest> {
    const res = await fetch(`${SERVER_API_URL}/manifiests?fields[0]=Content&populate[Profile][fields][0]=url&populate[Background][fields][0]=url`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const manifiestData = await res.json();
    const contentRaw = manifiestData.data[0].Content as string;
    const paragraphChunks = contentRaw
        .split(/\n\n/)
        .map((text: string) => text.trim())
        .filter((text: string) => text.length > 0);
    const contentTextMerge = paragraphChunks
        .map((text: string, index: number) => index === 0
            ? `<p className="side-panel-welcome">${text}</p>`
            : `<p>${text}</p>`
        ).join('');
    
    const manifiestResult : IManifiest = {
        content: contentTextMerge,
        profileUrl: `${manifiestData.data[0].Profile.url}`,
        backgroundUrl: `${manifiestData.data[0].Background.url}`,
    };


    return manifiestResult;
}

export async function APIGetSocial() : Promise<ISocial[]> {
    const res = await fetch(`${SERVER_API_URL}/socials?fields[0]=Name&fields[1]=Url&fields[2]=ViewBox&fields[3]=Width&fields[4]=Height&fields[5]=Path&sort=Order`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const socialData = await res.json();
    const socialResult : ISocial[] = [];
    socialData.data.forEach((item: { Name: string; Url: string; ViewBox: string; Width: number; Height: number; Path: string }) => {
        socialResult.push({
            name: item.Name,
            url: item.Url,
            viewBox: item.ViewBox,
            width: item.Width,
            height: item.Height,
            path: item.Path,
        });
    });

    return socialResult;
}

export async function APIGetPage(name: string) : Promise<IPage> {
    const res = await fetch(`${SERVER_API_URL}/pages?fields[0]=Title&fields[1]=Content&fields[2]&populate[Video][fields][0]=url&populate[Banner][fields][0]=url&filters[Title][$eq]=${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const pageData = await res.json();
    const pageResult : IPage = {
        title: "",
        video: "",
        banner: "",
    };
    
    pageData.data.forEach((item: { Title: string; Video: { url: string }; Banner: { url: string } }) => {
        pageResult.title = item.Title;
        pageResult.video = `${item.Video?.url}`;
        pageResult.banner = `${item.Banner?.url}`;
    });

    return pageResult;
}