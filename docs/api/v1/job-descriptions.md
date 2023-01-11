# Applications API

```TypeScript
type JobDescription = {
  id: number,
  rawText: string,
  createdAt: Date,
  updatedAt: Date,
}
```

# Get Job Description

Endpoint: `/api/v1/job-descriptions`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetJobDescriptionResponse = {
  data: JobDescription[] | null,
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
      "rawText": "",
      "createdAt": "2022-12-12",
      "updatedAt": "2022-12-12"
    }
  ],
}
```

### Example Error Response

Status Code: `500`

```JSON
{
  "data": null,
  "message": "Something went wrong on our side and we failed to get Job Descriptions"
}
```

# Create Job Description

Endpoint: `/api/v1/job-descriptions`

Method: `POST`

## Request

```TS
type CreateJobDescriptionRequest = {
  rawText: string,
}
```

**Example Request**

```JSON
{
  "rawText": "Why is it so hard to get a job?",
}
```

## Responses

**Body:**

```TypeScript
type CreateJobDescriptionsResponse = {
  data: JobDescription | null,
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
    "id": 1,
    "rawText": "Why is it so hard to get a job?",
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-12"
  }
}
```

### Example Error Response

Status Code: `500`

```JSON
{
  "data": null,
  "message": "Failed to create Job Description: invalid rawText field"
}
```

# Get Job Description by ID

Endpoint: `/api/v1/job-descriptions/:id`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetJobDescriptionByIdResponse = {
  data: JobDescription | null,
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
    "rawText": "3+ Years of React experience. 5+ Years of TS experience.",
    "createdAt": 2022-12-13,
    "updatedAt": "2022-12-12"
  }
}
```

### Example Error Response

Status Code: `400`

```JSON
{
  "data": null,
  "message": "Could not find Job Description with id `3`"
}
```

# Update Job Description

Endpoint: `/api/v1/job-descriptions/:id`

Method: `PATCH`

### Request

**Body:**

```TypeScript
type UpdateJobDescriptionRequest = {
  rawText: string,
}
```

**Example Request Body:**

```JSON
{
  "rawText": "Thou shall not pass!"
}
```

### Responses

**Body:**

```TypeScript
type UpdateJobDescriptionResponse = {
  data: JobDescription | null,
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
    "rawText": "Thou shall not pass!"
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-13",
  }
}
```

### Example Error Response

Status Code: `404`

```JSON
{
  "data": null,
  "message": "Could not find Job Description with id '4'"
}
```

# Delete Job Description

Endpoint: `/api/v1/job-descriptions/:id`

Method: `DELETE`

### Request

No body.

### Responses

**Body:**

```TypeScript
type DeleteJobDescriptionResponse = {
  data: JobDescription | null,
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
    "rawText": "Thou shall not pass!"
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-13",
  }
}
```

### Example Error Response

Status Code: `404`

```JSON
{
  "data": null,
  "message": "Could not find Job Description with id '5'"
}
```
