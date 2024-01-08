import { WORLD_NEWS_DEMO } from "../shared/WORLD_NEWS_DEMO";
import { TEST_NEWS } from "../shared/TEST_NEWS";
import { BREAKING_NEWS_DEMO } from "../shared/BREAKING_NEWS_DEMO";


export const getWorldNews = ({ numArticles }) => {
    return WORLD_NEWS_DEMO;
};

export const getBreakingNews = ({ numArticles }) => {
    return BREAKING_NEWS_DEMO;

};
