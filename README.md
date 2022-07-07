# myFlow

### mouse move

navbar, flow 섹션에서 addEventListener를 통해 마우스 이벤트 처리
-> IntersectionObserver

### onDrag | addEventListener('mousemove')

const onMouseMove = useCallback((event: MouseEvent) => {
if (!event.pageX || !divRef.current) return;
const cmp = divRef.current.getBoundingClientRect().left - event.pageX;
const width = divRef.current.clientWidth;
divRef.current.style.width = width + cmp + 10 + 'px';
}, []);

vs

    const onDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
        event.dataTransfer.setDragImage(new Image(), event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }

    const onDrag = (event: React.DragEvent<HTMLButtonElement>) => {
        if (!event.pageX || !divRef.current) return;
        const cmp = divRef.current.getBoundingClientRect().left - event.pageX;
        const width = divRef.current.clientWidth;
        divRef.current.style.width = width + cmp + 10 + 'px';
    }
