import React from 'react';

export default function reactIsInDevelomentMode() {
   return !('_self' in React.createElement('div'));
}
