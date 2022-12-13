# Applications API

**Application Type**
```TypeScript
type Application = {
  id: number,
  jobListingId?: number,
  status:  "APPLIED" | "REJECTED" | "PHONE_SCREEN" | "INTERVIEW" | "JOB_OFFER",
  createdAt: Date,
  updatedAt: Date
}
```

# Get Applications

Endpoint: `/api/v1/applications`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetApplicationResponse = {
  data: Application[] | null,
  message?: string,
}
```

**Status Codes:**

- 200 - OK
- 500 - Internal Server Error

### Example Success Response

Status Code: `200`

```JSON
{
  "data": [
    {
      "id": 1,
      "jobListingId": 1,
      "status": "APPLIED",
      "createdAt": "2022-12-12",
      "updatedAt": "2022-12-12",
    }
  ],
}
```

### Example Error Response

Status Code: `500`

```JSON
{
  "data": [],
  "message": "Something went wrong from our side and we were unable to get Applications."
}
```

# Create Application

Endpoint: `/api/v1/applications`

Method: `POST`

## Request

```TS
type CreateApplicationRequest = {
  jobListingId: number,
  status: "APPLIED" | "REJECTED" | "PHONE_SCREEN" | "INTERVIEW" | "JOB_OFFER",
}
```

**Example Request**

```JSON
{
  "jobListingId": 1,
  "status": "APPLIED",
}
```

## Responses

**Body:**

```TypeScript
type CreateApplicationResponse = {
  data: Application | null,
  message?: string,
}
```

**Status Codes:**

- 201 - Created
- 400 - Bad Request
- 500 - Internal Server Error

### Example Success Response

Status Code: `201`

```JSON
{
  "data": {
    "id": 2,
    "jobListingId": 2,
    "status": "APPLIED",
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-12",
  }
}
```

### Example Error Response

Status Code: `400`

```JSON
{
  "data": null,
  "message": "Failed to create Application: 'status' is invalid"
}
```

# Get Application by ID

Endpoint: `/api/v1/applications/:id`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetApplicationByIdResponse = {
  data: Application | null,
  message?: string,
}
```

**Status Codes:**

- 200 - OK
- 400 - Bad Request
- 404 - Resource Not Found
- 500 - Internal Server Error

### Example Success Response

Status Code: `200`

```JSON
{
  "data": {
    "id": 3,
    "jobListingId": 3,
    "status": "REJECTED",
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-12",
  }
}
```

### Example Error Response

Status Code: `400`

```JSON
{
  "data": null,
  "message": "Invalid Input: 'id' was not a number"
}
```

# Update Application

Endpoint: `/api/v1/applications/:id`

Method: `PATCH`

### Request

```TypeScript
type UpdateApplicationRequest = {
  jobListingId?: number,
  status:  "APPLIED" | "REJECTED" | "PHONE_SCREEN" | "INTERVIEW" | "JOB_OFFER",
}
```

**Example Request**

```JSON
{
  "status": "INTERVIEW",
}
```

### Responses

**Body:**

```TypeScript
type UpdateApplicationResponse = {
  data: Application | null,
  message?: string,
}
```

**Status Codes:**

- 200 - OK
- 400 - Bad Request
- 404 - Resource Not Found
- 500 - Internal Server Error

### Example Success Response

Status Code: `200`

```JSON
{
  "data": {
    "id": 4,
    "jobListingId": 4,
    "status": "INTERVIEW",
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-12",
  }
}
```

### Example Error Response

Status Code: `404`

```JSON
{
  "data": null,
  "message": "Could not find Application with id '4'"
}
```

# Delete Application

Endpoint: `/api/v1/applications/:id`

Method: `DELETE`

### Request

No body.

### Responses

**Body:**

```TypeScript
type DeleteApplicationResponse = {
  data: Application | null,
  message?: string,
}
```

**Status Codes:**

- 200 - OK
- 400 - Bad Request
- 404 - Resource Not Found
- 500 - Internal Server Error

### Example Success Response

Status Code: `200`

```JSON
{
  "data": {
    "id": 5,
    "jobListingId": 5,
    "status": "INTERVIEW",
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-12",
  }
}
```

### Example Error Response

Status Code: `404`

```JSON
{
  "data": null,
  "message": "Could not find Application with id '3'"
}
```
