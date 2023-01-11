# Applications API

```TypeScript
type JobListing = {
  id: number,
  jobDescriptionId: number,
  url: string,
  source: "SEEK" | "LINKEDIN",
  position: string,
  company: string,
  createdAt: Date,
  updatedAt: Date,
}
```

# Get Job Listings

Endpoint: `/api/v1/job-listings`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetJobListingsResponse = {
  data: JobListing[] | null,
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
      "jobDescriptionId": 1,
      "url": "https://example.com/1234",
      "source": "SEEK",
      "position": "Software Developer Engineer I",
      "company": "Not Google"
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
  "message": "Something went wrong from our side and we were unable to fetch Job Listings"
}
```

# Create Job Listing

Endpoint: `/api/v1/job-listings`

Method: `POST`

## Request

```TS
type CreateJobListingRequest = {
  jobDescriptionId?: number,
  url: string,
  source: string,
  position:: string,
  company: string,
}
```

**Example Request**

```JSON
{
  "jobDescriptionId": 2,
  "url": "https://example.com/1234",
  "source": "SEEK",
  "position": "Junior Software Developer",
  "company": "Code.Sydney"
  "createdAt": "2022-12-12",
  "updatedAt": "2022-12-12",
}
```

## Responses

**Body:**

```TypeScript
type CreateJobListingResponse = {
  data: JobListing | null,
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
    "jobDescriptionId": 2,
    "url": "https://example.com/1234",
    "source": "SEEK",
    "position": "Junior Software Developer",
    "company": "Google"
    "createdAt": "2022-12-13",
    "updatedAt": "2022-12-13",
  }
}
```

### Example Error Response

Status Code: `500`

```JSON
{
  "data": null,
  "message": "Failed to create Job Listing: invalid 'url' field"
}
```

# Get Job Listing by ID

Endpoint: `/api/v1/job-listings/:id`

Method: `GET`

## Request

No body.

## Responses

**Body:**

```TypeScript
type GetJobListingByIdResponse = {
  data: JobListing | null,
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
    "jobDescriptionId": 3,
    "url": "https://example.com/1234",
    "source": "SEEK",
    "position": "Software Developer Engineer I",
    "company": "Google"
    "createdAt": "2022-12-12",
    "updatedAt": "2022-12-13",
  }
}
```

### Example Error Response

Status Code: `400`

```JSON
{
  "data": null,
  "message": "Could not find Job Listing with id '3'"
}
```

# Update Job Listing

Endpoint: `/api/v1/job-listings/:id`

Method: `PATCH`

### Request

**Body:**

```TypeScript
type UpdateJobListingRequest = {
  url?: string,
  source?: string,
  position:?: string,
  company?: string,
}
```

**Example Request Body:**

```JSON
{
  "url": "https://example.com/1234",
  "source": "SEEK",
  "position": "Software Engineer",
  "company": "Not Google"
}
```

### Responses

**Body:**

```TypeScript
type UpdateJobListingResponse = {
  data: JobListing | null,
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
    "jobDescriptionId": 4,
    "url": "https://example.com/1234",
    "source": "SEEK",
    "position": "Software Developer Engineer I",
    "company": "Not Google"
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
  "message": "Could not find Job Listing with id '4'"
}
```

# Delete Job Listing

Endpoint: `/api/v1/job-listings/:id`

Method: `DELETE`

### Request

No body.

### Responses

**Body:**

```TypeScript
type DeleteJobListingResponse = {
  data: JobListing | null,
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
    "jobDescriptionId": 5,
    "url": "https://example.com/1234",
    "source": "SEEK",
    "position": "Web Developer",
    "company": "Code.Sydney"
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
  "message": "Could not find Job Listing with id '5'"
}
```
