/**
 * 宏
 */

#ifndef EM_PORT_API
#   if defined(__EMSCRIPTEN__)
#       include <emscripten.h>
#       if defined(__cplusplus)
#           define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#       else
#           define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#       endif
#   else
#       if defined(__cplusplus)
#           define EM_PORT_API(rettype) extern "C" rettype
#       else
#           define EM_PORT_API(rettype) rettype
#       endif
#   endif
#endif