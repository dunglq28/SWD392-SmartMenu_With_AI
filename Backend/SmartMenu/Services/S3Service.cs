﻿using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Util;
using System.Text;

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
        string GetPreSignedURL(string fileName);
    }

    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3;
        private readonly string AWSAccessKeyId = "";
        private readonly string AWSSecretAccessKey = "";
        private const string BucketName = "smart-menu-with-ai";
        private static BasicAWSCredentials AwsCredentials;
        private static AmazonS3Config S3Config = new() { RegionEndpoint = Amazon.RegionEndpoint.APSoutheast1 };

        private readonly IConfiguration _configuration;
        public S3Service(IAmazonS3 s3, IConfiguration configuration)
        {
            _s3 = s3;
            _configuration = configuration;
            AWSAccessKeyId = _configuration["AWS:AccessKeyId"];
            AWSSecretAccessKey = _configuration["AWS:SecretAccessKey"];
            AwsCredentials = new(AWSAccessKeyId, AWSSecretAccessKey);
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

        public string GetPreSignedURL(string fileName)
        {
            var preIamge = "https://" + "smart-menu-with-ai.s3.ap-southeast-1.amazonaws.com/products/";
            string url = preIamge + fileName;
            return url;

        }

        public async Task<PutObjectResponse> UploadItemAsync(IFormFile file)
        {
            // Create directory Path if not exist
            //await CreateDirectoryAsync(directoryPath);

            using (var s3Client = new AmazonS3Client(AwsCredentials, S3Config))
            {
                var encodedFileName = Uri.EscapeDataString(file.FileName);
                // Request configuration 
                var putObjectRequest = new PutObjectRequest
                {
                    BucketName = BucketName,
                    ContentType = file.ContentType,
                    InputStream = file.OpenReadStream(),
                    Key = "products" + "/" + file.FileName,
                    Metadata =
                {
                    ["x-amz-meta-originalname"] = ConvertToAscii(file.FileName),
                    ["x-amz-meta-extension"] = ConvertToAscii(Path.GetExtension(file.FileName))
                }
                };

                // Response
                return await s3Client.PutObjectAsync(putObjectRequest);
            }

        }
        private static string ConvertToAscii(string input)
        {
            // Chuyển đổi chuỗi sang ASCII, thay thế các ký tự không phải ASCII bằng dấu chấm hỏi
            var bytes = Encoding.ASCII.GetBytes(input);
            return Encoding.ASCII.GetString(bytes);
        }
    }
}
