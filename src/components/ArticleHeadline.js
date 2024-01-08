import { Card, CardHeader } from "reactstrap"

const ArticleHeadline = ({ article, className }) => {
    const { title, url } = article;

    return (

        <Card className={className}>
            <a href={url}>
                <CardHeader>{title}</CardHeader>
            </a>
        </Card>

    )
}

export default ArticleHeadline;