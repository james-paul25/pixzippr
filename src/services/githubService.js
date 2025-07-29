import axios from "axios";

const fetchReleases = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_GITHUB_URL}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
        });
        const tags = res.data;

        const releasesWithDates = await Promise.all(
            tags.map(async (tag) => {
                const commitRes = await axios.get(tag.commit.url);
                const date = commitRes.data.commit.author.date;

                return {
                    name: tag.name,
                    url: `https://api.github.com/repos/james-paul25/pixzippr/commits/${tag.commit.sha}`,
                    date,
                };
            })
        );

        return releasesWithDates;
    } catch (e) {
        console.warn("Failed to fetch releases with commit dates:", e);
        return [];
    }
}

export { fetchReleases };