import { HealthCheckRating } from "../../types";

const HealthCheckRatingView = ({rating}: {rating: HealthCheckRating}) => {
    switch (rating) {
        case 0:
            return (<p>&#128154;</p>);
        case 1:
            return (<p>&#128155;</p>);
        case 2:
            return (<p>&#128153;</p>);
        case 3:
            return (<p>&#128156;</p>);
    }
};

export default HealthCheckRatingView;