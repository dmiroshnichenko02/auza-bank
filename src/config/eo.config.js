const SITE_NAME = 'Auza Bank'

export const getTitle = title => {
	return title ? `${SITE_NAME} | ${title}` : SITE_NAME
}
