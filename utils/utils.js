import moment from 'moment';

export const dateEndOfMonth = new moment().endOf('month').format('DD MMMM Y');
