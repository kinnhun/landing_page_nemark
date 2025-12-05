// Declarations for Ant Design locale modules that don't provide TypeScript
// declaration files in this project setup. These keep TypeScript from
// reporting "Could not find a declaration file for module 'antd/locale/...'".

import type { Locale } from 'antd/es/locale';

declare module 'antd/locale/vi_VN' {
  const value: Locale;
  export default value;
}

declare module 'antd/locale/en_US' {
  const value: Locale;
  export default value;
}

// Some installs may use the `es` path. Add fallbacks for those too.
declare module 'antd/es/locale/vi_VN' {
  const value: Locale;
  export default value;
}

declare module 'antd/es/locale/en_US' {
  const value: Locale;
  export default value;
}
