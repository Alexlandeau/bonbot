import logging


LOGGING_CONFIG = {
    "FORMAT": "[%(asctime)s] - [%(levelname)s] - [%(module)s] - [%(threadName)s]: %(message)s",
    "FILENAME": "logs/backend.log",
}


def set_logging_config(debug=False):
    """Utility function to set the app's logger config"""

    if debug:
        log_level = logging.DEBUG
    else:
        log_level = logging.INFO

    logging.basicConfig(
        filename=LOGGING_CONFIG.get("FILENAME"),
        format=LOGGING_CONFIG.get("FORMAT"),
        level=log_level
    )


def raise_and_log(err: Exception, message: str):
    """Utility function to log and error when it is risen, as it is not the default in Flask"""
    logging.error(err(message), stack_info=True)
    raise err(message)
