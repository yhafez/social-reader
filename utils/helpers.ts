export function isBeforeElement(first_id: string, second_id: string) {
	return (
		document.querySelectorAll('#' + first_id + ', #' + second_id)[0] ===
		document.getElementById(first_id)
	)
}

export function highlightText(
	startContainer: HTMLElement,
	endContainer: HTMLElement,
	key: string,
	highlightColor: string,
) {
	if (startContainer === endContainer) {
		startContainer.style.backgroundColor = highlightColor
		if (!startContainer.className.includes('highlight')) startContainer.className = `highlight`
		if (!startContainer.className.includes(key)) startContainer.className += ` ${key}`
	} else {
		if (startContainer.id && endContainer.id) {
			if (
				isBeforeElement(startContainer.id, endContainer.id) &&
				startContainer.nextElementSibling
			) {
				startContainer.style.backgroundColor = highlightColor
				if (!startContainer.className.includes('highlight')) startContainer.className = `highlight`
				startContainer.className += ` ${key}`
				highlightText(
					(startContainer.nextElementSibling.children[0] ||
						startContainer.nextElementSibling) as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			} else if (startContainer.previousElementSibling) {
				startContainer.style.backgroundColor = highlightColor
				if (!startContainer.className.includes('highlight')) startContainer.className = `highlight`
				startContainer.className += ` ${key}`
				highlightText(
					(startContainer.previousElementSibling.children[0] ||
						startContainer.previousElementSibling) as HTMLElement,
					endContainer,
					key,
					highlightColor,
				)
			}
		}
	}
}
