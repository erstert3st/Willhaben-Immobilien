def handle_argument_list(method):
    def wrapper(self, arguments):
        if isinstance(arguments, list):
            for argument in arguments:
                method(self, argument)
        else:
            method(self, arguments)
        return self
    return wrapper