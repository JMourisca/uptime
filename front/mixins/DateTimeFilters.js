import moment from "moment";

export const timeFormatter = {
    filters: {
        timeAgo(value) {
            return moment.utc(value).fromNow()
        },
        readableDateTime(value) {
            return moment.utc(value).format('ll')
        }
    }
}
