import { ServerError } from "../api";

/**
 * Get the object for displaying api request status on the page.
 *
 * @param   {boolean} Response Status of an API Request
 * @returns {object} object with text and type attributes
 */
export function getAlertMessage(status, message) {
  if (status === null) return { text: message ?? "Action staled", type: "warning" };
  if (status === true) return { text: message ?? "Action success!", type: "success" };
  if (status === false) return { text: message ?? "Action failed!", type: "error" };
}

/**
 * Handle errors caused by dataAPI calls
 *
 * @param   {error} err Error invoked by an API Request
 * @param   {Dispatch<SetStateAction<>>} setAlertState State of alert. Pass nothing here when unnecessary
 * @param   {boolean} verbose Debug only: display errors in console
 */
export default function handleError(err, setAlertState = () => {}, verbose = true) {
  if (verbose) console.error(err);
  if (err instanceof ServerError) {
    if ([401, 403, 404].includes(err.code)) {
      setAlertState(getAlertMessage(false, err.message));
      return;
    }
  }
  setAlertState(getAlertMessage(false, "Unexpected Error"));
}
