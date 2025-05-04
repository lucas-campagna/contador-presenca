export const InvalidType = (value?: any) => new Error("Invalid type error " + JSON.stringify(value));
export const InvalidReferenceToFirestore = () => new Error("Id or Ref not found");
export const DataBaseError = () => new Error('Database error');
export const NotSignedIn = () => new Error('Not signed In');