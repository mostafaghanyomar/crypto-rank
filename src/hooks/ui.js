import { useSelector } from "react-redux";
import { SECTION_1 } from "../store/actions";

export function useLoading() {
    return useSelector(currState => currState.ui.requestsInitiated > 0);
}

export function usePageAlerts(pageSection) {
    const sec = pageSection !== null ? pageSection : SECTION_1;
    return useSelector(currState => currState.ui.pageAlerts.filter(al => al.pageSection === sec));
}