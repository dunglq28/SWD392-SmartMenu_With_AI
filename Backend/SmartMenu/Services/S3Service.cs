using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Util;

namespace SmartMenu.Services
{
    public interface IS3Service
    {
        /// Custom AWS S3 service to upload, delete, create directory
        Task<bool> DirectoryExistAsync(string directoryPath);
        Task CreateDirectoryAsync(string directoryPath);
        Task<GetObjectResponse?> GetItemAsync(Guid id, string directoryPath);
        Task<PutObjectResponse> UploadItemAsync(IFormFile file);
        Task<DeleteObjectResponse> DeleteItemAsync(Guid id, string directoryPath);
        Task<string> GetPreSignedURL(string fileName);
    }

    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3;
        private const string AWSAccessKeyId = "AKIA57VZDNHQUMGKBPIY";
        private const string AWSSecretAccessKey = "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";
        private const string BucketName = "smart-menu-with-ai";
        private static BasicAWSCredentials AwsCredentials = new(AWSAccessKeyId, AWSSecretAccessKey);
        private static AmazonS3Config S3Config = new() { RegionEndpoint = Amazon.RegionEndpoint.APSoutheast1 };

        public S3Service(IAmazonS3 s3)
        {
            _s3 = s3;
        }

        public async Task CreateDirectoryAsync(string directoryPath)
        {
            if (!await DirectoryExistAsync(directoryPath))
            {
                using (var s3Client = new AmazonS3Client(AwsCredentials, S3Config))
                {
                    var putObjectRequest = new PutObjectRequest
                    {
                        BucketName = BucketName,
                        Key = directoryPath + "/",
                        ContentBody = ""
                    };

                    await s3Client.PutObjectAsync(putObjectRequest);
                }
            }
        }

        public Task<DeleteObjectResponse> DeleteItemAsync(Guid id, string directoryPath)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DirectoryExistAsync(string directoryPath)
        {
            using (var s3Client = new AmazonS3Client(AwsCredentials, S3Config))
            {
                var request = new ListObjectsV2Request
                {
                    BucketName = BucketName,
                    Prefix = directoryPath,
                    Delimiter = "/"
                };

                var response = await s3Client.ListObjectsV2Async(request);
                return response.CommonPrefixes.Count > 0;
            }
        }

        public Task<GetObjectResponse?> GetItemAsync(Guid id, string directoryPath)
        {
            throw new NotImplementedException();
        }

        public  Task<string> GetPreSignedURL(string fileName)
        {
            using (var s3Client = new AmazonS3Client(AwsCredentials, S3Config))
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = BucketName,
                    Key = "products/" + fileName,
                    Expires = DateTime.Now.AddDays(1),
                    Verb = HttpVerb.GET
                };
                string url = s3Client.GetPreSignedURL(request);
                return Task.FromResult(url);
            };
        }

        public async Task<PutObjectResponse> UploadItemAsync(IFormFile file)
        {
            // Create directory Path if not exist
            //await CreateDirectoryAsync(directoryPath);

            using (var s3Client = new AmazonS3Client(AwsCredentials, S3Config))
            {
                // Request configuration 
                var putObjectRequest = new PutObjectRequest
                {
                    BucketName = BucketName,
                    ContentType = file.ContentType,
                    InputStream = file.OpenReadStream(),
                    Key = "products" + "/" + file.FileName,
                    Metadata =
                {
                    ["x-amz-meta-originalname"] = file.FileName,
                    ["x-amz-meta-extension"] = Path.GetExtension(file.FileName)
                }
                };

                // Response
                return await s3Client.PutObjectAsync(putObjectRequest);
            }
        }
    }
}
